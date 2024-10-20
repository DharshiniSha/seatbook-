const rows = 5; // Number of rows
const seatsPerRow = 10; // Number of seats per row
const occupiedSeats = ['B3', 'C4', 'D5']; // Example of occupied seats
const seatMap = document.querySelector('.seat-map');
const selectedSeats = [];

function createSeatMap() {
    for (let i = 0; i < rows; i++) {
        for (let j = 1; j <= seatsPerRow; j++) {
            const seat = document.createElement('div');
            const seatId = String.fromCharCode(65 + i) + j; // A1, A2, ...
            seat.classList.add('seat');

            // Marking occupied seats
            if (occupiedSeats.includes(seatId)) {
                seat.classList.add('occupied');
                seat.textContent = seatId;
                seatMap.appendChild(seat);
                continue;
            }

            // Randomly assign seat types for demonstration
            const seatType = Math.random();
            if (seatType < 0.5) {
                seat.classList.add('premium');
            } else {
                seat.classList.add('vip');
            }

            seat.textContent = seatId;
            seatMap.appendChild(seat);

            // Seat selection logic
            seat.addEventListener('click', () => {
                if (seat.classList.contains('occupied')) {
                    alert('Seat is already occupied');
                    return;
                }

                if (seat.classList.contains('selected')) {
                    seat.classList.remove('selected');
                    selectedSeats.splice(selectedSeats.indexOf(seat.textContent), 1);
                } else {
                    seat.classList.add('selected');
                    selectedSeats.push(seat.textContent);
                }

                updateTotals();
            });
        }
    }
}

function updateTotals() {
    const seatCount = selectedSeats.length;
    const totalPrice = selectedSeats.reduce((total, seatId) => {
        const seatElement = document.querySelector(`.seat:contains(${seatId})`);
        const price = seatElement.classList.contains('vip') ? 20 : 
                      seatElement.classList.contains('premium') ? 15 : 
                      10;
        return total + price;
    }, 0);

    document.getElementById('selected-seats').textContent = selectedSeats.join(', ');
    document.getElementById('seat-count').textContent = seatCount;
    document.getElementById('total-price').textContent = `$${totalPrice}`;
}

document.getElementById('reset-seats').addEventListener('click', () => {
    selectedSeats.length = 0;
    document.querySelectorAll('.seat').forEach(seat => {
        seat.classList.remove('selected');
    });
    updateTotals();
});

// Confirm ticket and display confirmation
document.getElementById('confirm-tickets').addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
    }

    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.innerHTML = `
        <h2>Confirmation</h2>
        <p>Seats: ${selectedSeats.join(', ')}</p>
        <p>Total Price: ${document.getElementById('total-price').textContent}</p>
    `;
    confirmationDiv.classList.remove('hidden');
});

createSeatMap();
