'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AuditFormData } from '@/src/lib/audit-types';

interface ObjectivesStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ObjectivesStep({ }: ObjectivesStepProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Objectives</h2>
      <p className="text-gray-600">Section en cours de développement</p>
    </motion.div>
  );
}
