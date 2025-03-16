import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    name: string;
    image: string;
    description: string;
}


function LyfterForm() {

    const [submitting, setSubmitting] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    
    // const handleSubmit = event => {
    //     event.preventDefault();
    //     setSubmitting(true);

    //     setTimeout(() => {
    //       setSubmitting(false);
    //     }, 3000)      
    // }    onSubmit={handleSubmit}
    // <img src={image} alt='Lyfter Image' />


    return (
        <div style={{ padding: '20px' }}>
            <h1>Create new lyfter card</h1>
            {submitting &&
                <div>Submtting Form...</div>
            }
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
                            <input name="description" />
                        </label>
                    </fieldset>
                    <fieldset>    
                        <label>
                            <p>Image</p>
                            <input type='file' name="image" id='image'/>
                            
                        </label>
                    </fieldset>
                    <button type="submit">Submit</button>
                </form>
            </section>

        </div>    
    );
};

export default LyfterForm;