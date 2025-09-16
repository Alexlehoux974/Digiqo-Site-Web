import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    message: 'API route is working',
    timestamp: new Date().toISOString(),
    method: req.method,
    env: {
      hasAirtablePat: !!process.env.AIRTABLE_PAT,
      hasAirtableBaseId: !!process.env.AIRTABLE_BASE_ID,
      nodeEnv: process.env.NODE_ENV,
    }
  });
}