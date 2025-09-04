// Preset data for demonstration: users registered in previous days
    const ctx = document.getElementById('userPerDayChart').getContext('2d');
    const userPerDayChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Users Registered',
                data: [12, 18, 9, 15, 22, 7, 14], // Example: users registered each day
                backgroundColor: [
                    'rgba(255,180,80,0.7)',
                    'rgba(255,180,80,0.6)',
                    'rgba(255,180,80,0.5)',
                    'rgba(255,180,80,0.4)',
                    'rgba(255,180,80,0.3)',
                    'rgba(255,180,80,0.2)',
                    'rgba(255,180,80,0.1)'
                ],
                borderColor: 'rgba(27,43,101,1)',
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.7,
                categoryPercentage: 0.6
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'User Registrations This Week',
                    color: '#1b2b65',
                    font: { size: 18 }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#1b2b65', font: { weight: 'bold' } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#e0e6f7' },
                    ticks: { color: '#1b2b65' }
                }
            }
        }
    });
const user = {
    name: 'John Doe',
    email: 'john@example.com',
    bookings: [
      {room: 'Single Room', checkin: '2025-09-10', checkout: '2025-09-12', price: 100},
      {room: 'Deluxe Suite', checkin: '2025-09-20', checkout: '2025-09-23', price: 450}
    ]
  };

  const userNameEl = document.getElementById('userName');
  const userEmailEl = document.getElementById('userEmail');
  const editName = document.getElementById('editName');
  const editEmail = document.getElementById('editEmail');
  const editPassword = document.getElementById('editPassword');
  const editPic = document.getElementById('editPic');
  const saveProfile = document.getElementById('saveProfile');
  const profilePic = document.getElementById('profilePic');
  const bookingList = document.getElementById('bookingList');

  // Display booking history
  function displayBookings() {
    bookingList.innerHTML = '';
    user.bookings.forEach(b => {
      const div = document.createElement('div');
      div.className = 'booking-item';
      div.innerHTML = `
        <strong>${b.room}</strong><br>
        Check-in: ${b.checkin}, Check-out: ${b.checkout}<br>
        Total: $${b.price}
      `;
      bookingList.appendChild(div);
    });
  }

  displayBookings();

  // Save profile changes
  saveProfile.addEventListener('click', () => {
    if(editName.value) { user.name = editName.value; userNameEl.textContent = editName.value; }
    if(editEmail.value) { user.email = editEmail.value; userEmailEl.textContent = editEmail.value; }
    if(editPic.files[0]) {
      const reader = new FileReader();
      reader.onload = e => profilePic.src = e.target.result;
      reader.readAsDataURL(editPic.files[0]);
    }
    // Add booking history entry
    const newBooking = {
      room: 'Standard Room',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      price: 120
    };
    user.bookings.push(newBooking);
    displayBookings();
    alert('Profile updated successfully! Booking history updated.');
    editName.value = '';
    editEmail.value = '';
    editPassword.value = '';
    editPic.value = '';
  });

  // Booking graph customization
  window.addEventListener('DOMContentLoaded', function() {
    if (window.Chart && document.getElementById('userPerDayChart')) {
        const ctx = document.getElementById('userPerDayChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Users Registered',
                    data: [5, 8, 6, 7, 10, 4, 9],
                    backgroundColor: [
                        'rgba(255,180,80,0.7)',
                        'rgba(255,180,80,0.6)',
                        'rgba(255,180,80,0.5)',
                        'rgba(255,180,80,0.4)',
                        'rgba(255,180,80,0.3)',
                        'rgba(255,180,80,0.2)',
                        ''
                    ],
                    borderColor: 'rgba(255,180,80,0.7)',
                    borderWidth: 2,
                    borderRadius: 6,
                    barPercentage: 0.7,
                    categoryPercentage: 0.6
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'User Registrations This Week',
                        color: '#1b2b65',
                        font: { size: 18 }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#1b2b65', font: { weight: 'bold' } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e0e6f7' },
                        ticks: { color: '#1b2b65' }
                    }
                }
            }
        });
    }
});

// this is for book now button
function bookingNow() {
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'block';
        welcomeMsg.textContent = 'Welcome to Trillionex Hotel! Your booking is our pleasure.';
        setTimeout(() => {
            welcomeMsg.style.display = 'none';
        }, 3500);
    }
}
// Ensure the bar chart preview is rendered after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('userPerDayChart');
    if (window.Chart && chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Users Registered',
                    data: [12, 18, 9, 15, 22, 7, 14],
                    backgroundColor: [
                        '#ffa500',
                        '#ffa500',
                        '#ffa500',
                        '#ffa500',
                        '#ffa500',
                        '#ffa500',
                        '#ffa500'
                    ],
                    borderColor: '#ffa500',
                    borderWidth: 2,
                    borderRadius: 6,
                    barPercentage: 0.7,
                    categoryPercentage: 0.6
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'User Registrations This Week',
                        color: '#ffa500',
                        font: { size: 18 }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#ffa500', font: { weight: 'bold' } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e0e6f7' },
                        ticks: { color: '#ffa500' }
                    }
                }
            }
        });
    }
});

