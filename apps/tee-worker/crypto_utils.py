import hashlib
import json
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization
from cryptography.exceptions import InvalidSignature

# In a real Flare Confidential Compute enclave, this private key 
# is hardcoded in the HSM/hardware enclave at boot time.
# We generate a static test key pair here for the simulation.
_private_key = ec.generate_private_key(ec.SECP256R1())
_public_key = _private_key.public_key()

PUBLIC_KEY_PEM = _public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
).decode('utf-8')

# Same secret as backend for symmetric decryption of payload
# In production, this would be negotiated via secure TLS / key exchange.
SECRET_KEY = hashlib.sha256(b'confidra-tee-secret-key-2026').digest()

def decrypt_payload(encrypted_hex: str, iv_hex: str, tag_hex: str) -> dict:
    """Decrypt AES-256-GCM payload from backend"""
    aesgcm = AESGCM(SECRET_KEY)
    
    # Cryptography AEAD expects encrypted_data + tag in one buffer
    ciphertext = bytes.fromhex(encrypted_hex) + bytes.fromhex(tag_hex)
    iv = bytes.fromhex(iv_hex)
    
    plaintext = aesgcm.decrypt(iv, ciphertext, None)
    return json.loads(plaintext.decode('utf-8'))

def encrypt_payload(payload: dict) -> tuple:
    """Encrypt AES-256-GCM payload back to backend"""
    aesgcm = AESGCM(SECRET_KEY)
    iv = os.urandom(16)
    
    plaintext = json.dumps(payload).encode('utf-8')
    ciphertext_and_tag = aesgcm.encrypt(iv, plaintext, None)
    
    # GCM tag is the last 16 bytes
    ciphertext = ciphertext_and_tag[:-16]
    tag = ciphertext_and_tag[-16:]
    
    return ciphertext.hex(), iv.hex(), tag.hex()

def sign_execution(result_payload: dict) -> str:
    """Sign the execution hash with Enclave ECDSA key"""
    execution_hash = hashlib.sha256(json.dumps(result_payload, sort_keys=True).encode()).digest()
    signature = _private_key.sign(execution_hash, ec.ECDSA(hashes.SHA256()))
    return execution_hash.hex(), signature.hex()
