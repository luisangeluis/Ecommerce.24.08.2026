const URL = "http://localhost:3000/cart-items";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMzZmMjhiOC02MGNhLTQ3MmQtYjM1MS0wNjE1YTQ0OTZmMmEiLCJpYXQiOjE3OTE4NjQyNjUsImV4cCI6MTc5MTg2Nzg2NX0.NrVnKy2R5l5jrSugh-NQIIqmBtr_kyj-m4wUvlYurEw";
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
     const totalRequests = 5;

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