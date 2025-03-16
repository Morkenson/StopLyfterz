import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../assets/styles/BusinessPage.css';

function LyfterForm() {

    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px' }}>
            <header>
            <h1>Create new lyfter card</h1>
            <button onClick={() => navigate('/business')} className='custom-button'>Back to Dashboard</button>
            <button className='logout-button'>Logout</button>
            </header>
            
            <section>
                <form>
                    <fieldset>
                        <label>
                            <p>Name</p>
                            <input name="name" />
                        </label>
                    </fieldset>
                    <fieldset>    
                        <label>
                            <p>Location</p>
                            <input name="location" />
                        </label>
                    </fieldset>
                    <fieldset>    
                        <label>
                            <p>Description</p>
                            <textarea name="description" />
                        </label>
                    </fieldset>
                    <fieldset>    
                        <label>
                            <p>Image</p>
                            <input type='file' name="image" id='image'/>
                            
                        </label>
                    </fieldset>

                    <p>
                        After submitting, please allow StopLyfter Admins 2-3 weeks to review and approve your
                            submission before it is posted publicly to the website. If 3+ weeks have expired
                            and your submission has been neither approved/denied, please reach out to
                            StopLyfter Admins.
                    </p>
                    <button type="submit">Submit</button>
                </form>
            </section>

        </div>    
    );
};

export default LyfterForm;