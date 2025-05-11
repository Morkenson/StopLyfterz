import React, { useEffect, useState } from 'react';
import {
  fetchPendingBusinessAccounts,
  approveBusinessAccount,
  rejectBusinessAccount,
  Profile,
} from '../AdminController';


const VerifyAccount: React.FC = () => {
  const [pendingAccounts, setPendingAccounts] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  

  useEffect(() => {
    async function loadPending() {
      try {
        const profiles = await fetchPendingBusinessAccounts();
        setPendingAccounts(profiles);
      } catch (err: any) {
        setError(err.message);
      }
    }
    loadPending();
  }, []);

  const handleApprove = async (email: string) => {
    try {
      await approveBusinessAccount(email);
      setPendingAccounts(pendingAccounts.filter((acc) => acc.Email !== email));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReject = async (email: string) => {
    try {
      await rejectBusinessAccount(email);
      setPendingAccounts(pendingAccounts.filter((acc) => acc.Email !== email));
    } catch (err: any) {
      setError(err.message);
    }

  };

    return (
  
    <div style={{ padding: '20px' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <section>
          <h2>Pending Business Accounts</h2>
          {pendingAccounts.length > 0 ? (
            <ul>
              {pendingAccounts.map((account) => (
                <li key={account.Email} style={{ marginBottom: '10px' }}>
                  <p>Email: {account.Email}</p>
                  <p>Level: {account.Level}</p>
                  <button
                    onClick={() => handleApprove(account.Email)}
                    style={{ marginRight: '10px' }}
                  >
                    Approve
                  </button>
                  <button onClick={() => handleReject(account.Email)}>
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