import { Shield, ShieldCheck, ShieldAlert, ShieldX, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PassportBadgeProps {
  hasPassport: boolean;
  passportId?: string;
  passportDate?: string;
  compact?: boolean;
  showLink?: boolean;
}

export default function PassportBadge({ hasPassport, passportId, passportDate, compact = false, showLink = true }: PassportBadgeProps) {
  if (hasPassport) {
    if (compact) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald/10 text-emerald text-xs font-medium rounded-full">
          <ShieldCheck className="w-3 h-3" />
          Passport: Yes
        </span>
      );
    }
    return (
      <div className="bg-emerald/[0.04] border border-emerald/20 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald">Vehicle Passport: Verified</p>
              <p className="text-xs text-obsidian/50 mt-0.5">Independently inspected & verified</p>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald/10 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-obsidian/40">Passport ID</span>
            <p className="font-mono text-obsidian/70">{passportId}</p>
          </div>
          <div>
            <span className="text-obsidian/40">Inspected</span>
            <p className="text-obsidian/70">{passportDate ? new Date(passportDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</p>
          </div>
        </div>
        {showLink && passportId && (
          <Link to={`/passport/${passportId}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald hover:text-emerald-light transition-colors">
            View Full Report <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-obsidian/5 text-obsidian/50 text-xs font-medium rounded-full">
        <Shield className="w-3 h-3" />
        Passport: No
      </span>
    );
  }

  return (
    <div className="bg-ivory-dark border border-obsidian/[0.06] rounded-xl p-4">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-obsidian/5 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-obsidian/40" />
        </div>
        <div>
          <p className="text-sm font-semibold text-obsidian/70">Vehicle Passport: Not Available</p>
          <p className="text-xs text-obsidian/40 mt-0.5">This vehicle has not been independently inspected yet.</p>
          <Link to="/inspect" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gold-dark hover:text-gold transition-colors">
            Learn About Inspections <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PassportStatusIcon({ status }: { status: 'verified' | 'pending' | 'expired' | 'none' }) {
  switch (status) {
    case 'verified':
      return <ShieldCheck className="w-4 h-4 text-emerald" />;
    case 'pending':
      return <ShieldAlert className="w-4 h-4 text-amber-600" />;
    case 'expired':
      return <ShieldX className="w-4 h-4 text-red-500" />;
    default:
      return <Shield className="w-4 h-4 text-obsidian/30" />;
  }
}
