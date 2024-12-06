document.addEventListener('DOMContentLoaded', () => {
  const sosButton = document.querySelector('.sos-button');

  // Replace these with your EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_4cmopod';
  const EMAILJS_TEMPLATE_ID = 'template_15fl6mj';
  const EMAILJS_PUBLIC_KEY = 'Df_vjF5HI1KXNve9c';

  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  // SOS button click event
  sosButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior of the button

    // Access device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Prepare email data
          const emailData = {
            user_location: `Latitude: ${latitude}, Longitude: ${longitude}`,
            user_message: 'An SOS alert has been triggered. Please respond immediately.',
          };

          // Send email using EmailJS
          emailjs
            .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData)
            .then(() => {
              alert('SOS message sent successfully!');
              // Redirect to help.html after email is sent
              window.location.href = 'help.html';
            })
            .catch((error) => {
              console.error('Failed to send SOS email:', error);
              alert('Failed to send SOS message. Redirecting to the help page.');
              // Redirect to help.html even if the email fails
              window.location.href = 'help.html';
            });
        },
        (error) => {
          console.error('Error accessing location:', error);
          alert('Unable to access location. Redirecting to the help page.');
          // Redirect to help.html if geolocation fails
          window.location.href = 'help.html';
        }
      );
    } else {
      alert('Geolocation is not supported by this browser. Redirecting to the help page.');
      // Redirect to help.html if geolocation is unavailable
      window.location.href = 'help.html';
    }
  });
});
