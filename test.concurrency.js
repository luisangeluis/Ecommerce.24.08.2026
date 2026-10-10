const URL = "http://localhost:3000/cart-items";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMzZmMjhiOC02MGNhLTQ3MmQtYjM1MS0wNjE1YTQ0OTZmMmEiLCJpYXQiOjE3OTE2MTA4NjMsImV4cCI6MTc5MTYxNDQ2M30.fBzMQjWEg6pXk4CyNRfFIGC_L2zRNtw5eGVSKFbxJVI";
const PRODUCT_ID = "4ab5df51-23df-4467-b99d-c65a8d2d2ba9";

async function addProduct() {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            productId: PRODUCT_ID
        })
    });

    const body = await response.json();

    return {
        status: response.status,
        body
    };
}

async function main() {
     const totalRequests = 3;

    const results = await Promise.allSettled(
        Array.from({ length: totalRequests }, () => addProduct())
    );

    console.log("Solicitudes:", totalRequests);
    console.log(
        "Exitosas:",
        results.filter(r => r.status === "fulfilled").length
    );
    console.log(
        "Fallidas:",
        results.filter(r => r.status === "rejected").length
    );

    console.dir(results, { depth: null });
}

main().catch(console.error);