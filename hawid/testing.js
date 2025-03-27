async function fetchDebts() {
    try {
      const response = await fetch("http://localhost:5700/social_credit/api/auth/debts", {
        method: "GET",
        credentials: "include", // Required for cookies-based auth
        headers: {
          "Content-Type": "application/json",
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmRkOWQ5Yi00Y2ZmLTQ0MzctYjNhZC01OTM3MTllMWI0MGYiLCJlbWFpbCI6ImJydWhAaGl0bWFuLmNvbSIsImlhdCI6MTc0MzAwNTY2MywiZXhwIjoxNzQzMDA5MjYzfQ.FPfZujsyHSWhCtsVEBH6ug6rI7oEl_6kJprenGaWhi0", // If using JWT
        },
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("Debts:", data);
    } catch (error) {
      console.error("Error fetching debts:", error.message);
    }
  }
  
  fetchDebts();


//   curl -X GET "http://localhost:5700/social_credit/api/auth/debts" \ -H "Authorization: Bearer "
  