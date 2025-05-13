import React, { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";
import '../assets/styles/BusinessVerification.css';

/**
 * Table schema (see screenshot):
 *  id               int8  (PK)
 *  locationSupervisor  text
 *  supervisorEmail     text   ← unique per business
 *  businessAddress     text
 *  Authorized          boolean
 */
export interface BusinessRow {
  id: number;
  locationSupervisor: string | null;
  supervisorEmail: string;
  businessAddress: string | null;
  Authorized: boolean;
}

const VerifyAccount: React.FC = () => {
  const [pendingAccounts, setPendingAccounts] = useState<BusinessRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  /** fetch businesses that are **not yet authorised** */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('BusinessVerification')
        .select('*')
        .eq('Authorized', false);

      if (error) setError(error.message);
      else setPendingAccounts(data ?? []);
    })();
  }, []);

  /** set `Authorized = TRUE` for the given supervisor e‑mail */
  const handleApprove = async (email: string) => {
    const { error } = await supabase
      .from('BusinessVerification')
      .update({ Authorized: true })
      .eq('supervisorEmail', email);

    if (error) {
      setError(error.message);
    } else {
      setPendingAccounts(prev => prev.filter(row => row.supervisorEmail !== email));
    }
  };

  /** reject = delete the row (or you could archive) */
  const handleReject = async (email: string) => {
    const { error } = await supabase
      .from('BusinessVerification')
      .delete()
      .eq('supervisorEmail', email);

    if (error) setError(error.message);
    else setPendingAccounts(prev => prev.filter(row => row.supervisorEmail !== email));
  };

  return (
  <div className="bv-container">
    {error && <p className="bv-error">{error}</p>}

    <section className="bv-section">
      <h2>Pending Business Accounts</h2>
      {pendingAccounts.length ? (
        <ul className="bv-account-list">
          {pendingAccounts.map(acc => (
            <li key={acc.id} className="bv-account-item">
              <p>Email: {acc.supervisorEmail}</p>
              <p>Supervisor: {acc.locationSupervisor ?? '—'}</p>
              <p>Address: {acc.businessAddress ?? '—'}</p>

              <button
                className="bv-btn bv-btn-approve"
                onClick={() => handleApprove(acc.supervisorEmail)}
              >
                Approve
              </button>
              <button
                className="bv-btn bv-btn-reject"
                onClick={() => handleReject(acc.supervisorEmail)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending business accounts.</p>
      )}
    </section>
  </div>
);
};

export default VerifyAccount;