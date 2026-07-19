'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Save, Play, Settings, GripVertical, AlertTriangle, ShieldCheck, Box } from 'lucide-react';

const INITIAL_STAGES = [
  { id: 'stage-1', type: 'submission', label: 'Application Submission', icon: Box },
  { id: 'stage-2', type: 'ai-eval', label: 'AI Risk Evaluation', icon: AlertTriangle },
  { id: 'stage-3', type: 'tee-verify', label: 'TEE Verification', icon: ShieldCheck },
];

export default function WorkflowBuilder() {
  const router = useRouter();
  const [stages, setStages] = useState(INITIAL_STAGES);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setStages(items);
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/workflows')} className="text-sm text-slate-400 hover:text-white">
            ← Back
          </button>
          <h1 className="text-xl font-bold">Visual Workflow Builder</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-colors">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors font-medium">
            <Play className="w-4 h-4" /> Publish
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Stage Palette */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/30 p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Stage Palette</h2>
          <div className="space-y-2">
            {[
              { type: 'AI Evaluation', icon: AlertTriangle, color: 'text-yellow-500' },
              { type: 'TEE Execution', icon: ShieldCheck, color: 'text-blue-500' },
              { type: 'Blockchain Sync', icon: Box, color: 'text-purple-500' }
            ].map((tool, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg cursor-grab hover:border-slate-600 transition-colors">
                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                <span className="text-sm font-medium">{tool.type}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 bg-slate-950 relative overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="workflow-canvas">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {stages.map((stage, index) => {
                      const Icon = stage.icon;
                      const isSelected = selectedStage === stage.id;
                      return (
                        <Draggable key={stage.id} draggableId={stage.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              onClick={() => setSelectedStage(stage.id)}
                              className={`flex items-center gap-4 bg-slate-900 border ${isSelected ? 'border-blue-500' : 'border-slate-800'} rounded-xl p-4 shadow-xl cursor-pointer hover:border-slate-700 transition-colors group`}
                            >
                              <div {...provided.dragHandleProps} className="text-slate-500 hover:text-white cursor-grab">
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{stage.label}</h3>
                                <p className="text-xs text-slate-400">Step {index + 1} • {stage.type}</p>
                              </div>
                              <button className="p-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity">
                                <Settings className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </main>

        {/* Right Sidebar - Configurator */}
        <aside className={`w-80 border-l border-slate-800 bg-slate-900 p-6 overflow-y-auto transition-transform ${selectedStage ? 'translate-x-0' : 'translate-x-full absolute right-0 top-16 bottom-0'}`}>
          {selectedStage ? (
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold">Stage Configuration</h2>
                <button onClick={() => setSelectedStage(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Stage Name</label>
                  <input type="text" defaultValue={stages.find(s => s.id === selectedStage)?.label} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                
                {stages.find(s => s.id === selectedStage)?.type === 'ai-eval' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">AI Confidence Threshold</label>
                      <input type="range" min="0" max="100" defaultValue="85" className="w-full accent-blue-500" />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0%</span><span>85%</span><span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Policy Rule Editor</label>
                      <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono" defaultValue='{"condition": "riskScore < 30", "action": "APPROVE"}'></textarea>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </aside>

      </div>
    </div>
  );
}
