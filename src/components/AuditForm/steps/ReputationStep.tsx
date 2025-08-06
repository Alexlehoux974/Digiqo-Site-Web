'use client';
import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';

interface ReputationStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ReputationStep({ data, updateData, errors }: ReputationStepProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Reputation</h2>
      <p className="text-gray-600">Section en cours de développement</p>
    </motion.div>
  );
}
