import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    name: string;
    image: string;
    description: string;
}

interface BusinessAccount {
    businessName: string;
    email: string;
    id: number;
}

const Admin: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [pendingAccounts, setPendingAccounts] = useState<BusinessAccount[]>([]);
    

    const handleAccept = (id: number) => {
        'something'
    };

    const handleDeny = (id: number) => {
        'something aswell'
    };


    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>

            <section>
                <h2>Posted People</h2>
                {posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id} style={{ marginBottom: '10px' }}>
                                <img src={post.image} alt={post.name} style={{ width: '100px', marginRight: '10px' }} />
                                <strong>{post.name}</strong>
                                <p>{post.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No posts available.</p>
                )}
            </section>

            <section style={{ marginTop: '40px' }}>
                <h2>Pending Business Accounts</h2>
                {pendingAccounts.length > 0 ? (
                    <ul>
                        {pendingAccounts.map(account => (
                            <li key={account.id} style={{ marginBottom: '10px' }}>
                                <p>Email: {account.email}</p>
                                <p>Business Name: {account.businessName}</p>
                                <button onClick={() => handleAccept(account.id)} style={{ marginRight: '10px' }}>
                                    Accept
                                </button>
                                <button onClick={() => handleDeny(account.id)}>Deny</button>
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

export default Admin;