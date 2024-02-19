console.log("me a boi");

const apiKey = '5rcN3vnNwe3HHzGnBdv0LHQxPOhzeqoTPmffIonH';
const apiUrlBase = 'https://api.nasa.gov/planetary/apod';


const fetchAPOD = async (date) => {
    try {
        const apiUrl = `${apiUrlBase}?api_key=${apiKey}&date=${date}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from NASA API');
        }

        const data = await response.json();

        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('apodImage').src = data.url;
        document.getElementById('apodTitle').textContent = data.title;
        document.getElementById('apodExplanation').textContent = data.explanation;
    } catch (error) {
        console.error('Error fetching APOD data:', error);
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('errorMessage').textContent = 'Failed to fetch data. Please try again later.';
    }
};

// this is a function for the select dates section

const changeDate = () => {
    const selectedDate = document.getElementById('datepicker').value;
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('errorMessage').textContent = '';
    fetchAPOD(selectedDate);
};

// this show the picture for today when the page loads
window.onload = () => {
    const today = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
    document.getElementById('datepicker').value = today;
    changeDate();
    document.getElementById('loadingSpinner').style.display = 'block';
    fetchAPOD(today);
};
   
