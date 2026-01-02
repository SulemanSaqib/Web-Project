const testEvent = {
    title: "Test Event",
    description: "This is a test event",
    date: "2024-12-31",
    time: "23:59",
    venue: "Test Venue",
    totalSeats: 100,
    price: 10,
    category: "Tech",
    imageURL: ""
};

async function verifyBackend() {
    try {
        console.log('Testing Backend API...');

        // Test 1: Health Check (Root)
        try {
            const rootRes = await fetch('http://localhost:5000/');
            if (rootRes.ok) console.log('✅ Root endpoint: OK');
            else console.error('❌ Root endpoint failed:', rootRes.status);
        } catch (e) {
            console.error('❌ Root endpoint failed:', e.message);
        }

        // Test 2: Create Event
        console.log('Testing Create Event...');
        const createRes = await fetch('http://localhost:5000/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testEvent)
        });

        if (createRes.status === 201) {
            const data = await createRes.json();
            console.log('✅ Event Created Successfully:', data._id);

            // Clean up: Delete the test event
            const deleteRes = await fetch(`http://localhost:5000/api/events/${data._id}`, {
                method: 'DELETE'
            });
            if (deleteRes.ok) {
                console.log('✅ Test Event Deleted Successfully');
            }
        } else {
            console.error('❌ Event Creation Failed:', createRes.status);
            const err = await createRes.text();
            console.error('Error details:', err);
        }

    } catch (error) {
        console.error('❌ Verification Failed:', error.message);
    }
}

verifyBackend();
