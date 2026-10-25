import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ 
  title = 'Something went wrong', 
  message, 
  onRetry 
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury p-8 border-2 border-red-200 bg-red-50"
    >
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <AlertCircle className="w-6 h-6 text-red-600" />
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-xl font-bold text-red-900 mb-2"
          >
            {title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-red-800 mb-4"
          >
            {message}
          </motion.p>
          
          {onRetry && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onRetry}
              className="px-6 py-2.5 bg-red-600 text-ivory font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              Try Again
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
