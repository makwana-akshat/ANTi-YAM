import React, { useState, useEffect } from 'react';
import { useDiseaseStore } from '../store/useDiseaseStore';
import { DynamicFormRenderer } from './DynamicFormRenderer';
import type { DiseaseTemplate } from '../types/schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/Dialog';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HealthLogModal() {
  const { isLoggingModalOpen, currentLoggingContext, closeModal, saveLog } = useDiseaseStore();
  const [template, setTemplate] = useState<DiseaseTemplate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isLoggingModalOpen && currentLoggingContext) {
      // In a real app, this would be an API call to get the AI JSON schema
      // For the hackathon, we load local mock JSONs
      import(`../templates/${currentLoggingContext}.json`)
        .then((module) => {
          setTemplate(module.default);
        })
        .catch((err) => {
          console.error("Failed to load schema", err);
          // Fallback schema if "Other" disease was selected and not generated yet
          setTemplate({
            title: `Daily ${currentLoggingContext} Log`,
            sections: [{
              title: "General Vitals",
              fields: [
                { id: "notes", label: "General Notes", component: "textarea", icon: "FileText" }
              ]
            }]
          });
        });
    } else {
      // Reset state when closed
      setTimeout(() => {
        setTemplate(null);
        setShowSuccess(false);
      }, 300);
    }
  }, [isLoggingModalOpen, currentLoggingContext]);

  const handleSubmit = (data: Record<string, any>) => {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      saveLog(currentLoggingContext || 'unknown', data);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        closeModal();
      }, 1500);
    }, 800);
  };

  return (
    <Dialog open={isLoggingModalOpen} onOpenChange={(open: boolean) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[800px] p-0 border-0">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 px-6 text-center"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Icons.CheckCircle size={48} />
              </div>
              <DialogTitle className="text-3xl mb-2">Log Saved Successfully</DialogTitle>
              <DialogDescription className="text-lg">Your health data has been securely recorded.</DialogDescription>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-10"
            >
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl font-extrabold flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                    <Icons.Activity size={24} />
                  </div>
                  {template ? template.title : 'Loading Schema...'}
                </DialogTitle>
                <DialogDescription className="text-lg mt-2">
                  Complete your daily check-in to keep your trends accurate.
                </DialogDescription>
              </DialogHeader>

              {template ? (
                <DynamicFormRenderer 
                  template={template} 
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <div className="flex justify-center items-center py-20">
                  <Icons.Loader2 className="animate-spin text-blue-500" size={48} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
