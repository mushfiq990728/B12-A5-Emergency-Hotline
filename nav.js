
let heartCount = 0;
let coinCount = 100; 
let copyCount = 0;

const heartCountElement = document.getElementById('heart-count');
const coinCountElement = document.getElementById('coin-count');
const copyCountElement = document.getElementById('copy-count');
const callHistoryElement = document.getElementById('call-history');
const clearHistoryButton = document.getElementById('clear-history');


coinCountElement.textContent = coinCount;


const emergencyServices = {
    emergency: { name: "National Emergency Number", number: "999" },
    police: { name: "Police Helpline Number", number: "999" },
    fire: { name: "Fire Service Number", number: "999" },
    ambulance: { name: "Ambulance Service", number: "1994-999999" },
    women: { name: "Women & Child Helpline", number: "109" },
    corruption: { name: "Anti-Corruption Helpline", number: "106" },
    electricity: { name: "Electricity Helpline", number: "16216" },
    brac: { name: "BRAC Helpline", number: "16445" },
    railway: { name: "Bangladesh Railway Helpline", number: "163" }
};


const heartButtons = [
    'heart-emergency', 'heart-police', 'heart-fire', 'heart-ambulance',
    'heart-women', 'heart-corruption', 'heart-electricity', 'heart-brac', 'heart-railway'
];

heartButtons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function() {
            heartCount++;
            heartCountElement.textContent = heartCount;
            
            
            const heartSvg = this.querySelector('svg');
            if (heartSvg) {
                heartSvg.style.fill = 'red';
                heartSvg.style.color = 'red';
            }
        });
    }
});


const copyButtons = [
    'copy-emergency', 'copy-police', 'copy-fire', 'copy-ambulance',
    'copy-women', 'copy-corruption', 'copy-electricity', 'copy-brac', 'copy-railway'
];

copyButtons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function() {
            const serviceKey = buttonId.replace('copy-', '');
            const service = emergencyServices[serviceKey];
            
            if (service) {
                
                navigator.clipboard.writeText(service.number).then(function() {
                    
                    alert(`${service.name} number "${service.number}" has been copied to clipboard!`);
                    
                    
                    copyCount++;
                    copyCountElement.textContent = copyCount;
                }).catch(function() {
                    
                    const textArea = document.createElement('textarea');
                    textArea.value = service.number;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    alert(`${service.name} number "${service.number}" has been copied to clipboard!`);
                    copyCount++;
                    copyCountElement.textContent = copyCount;
                });
            }
        });
    }
});


const callButtons = [
    'call-emergency', 'call-police', 'call-fire', 'call-ambulance',
    'call-women', 'call-corruption', 'call-electricity', 'call-brac', 'call-railway'
];

callButtons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function() {
            const serviceKey = buttonId.replace('call-', '');
            const service = emergencyServices[serviceKey];
            
            if (service) {
                
                if (coinCount < 20) {
                    alert('Insufficient coins! You need at least 20 coins to make a call. Please recharge your account.');
                    return;
                }
                
                
                coinCount -= 20;
                coinCountElement.textContent = coinCount;
                
                
                alert(`Calling ${service.name} at ${service.number}. Call cost: 20 coins. Remaining coins: ${coinCount}`);
                
               
                addToCallHistory(service);
            }
        });
    }
});

// Function to add service to call history
function addToCallHistory(service) {
    const currentTime = new Date();
    const timeString = currentTime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const historyItem = document.createElement('div');
    historyItem.className = 'bg-gray-50 p-3 rounded-lg border-l-4 border-green-500';
    
    historyItem.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <h3 class="font-semibold text-sm text-gray-800">${service.name}</h3>
                <p class="text-green-600 font-mono text-sm">${service.number}</p>
                <p class="text-xs text-gray-500 mt-1">
                    <i class="fa-regular fa-clock mr-1"></i>${timeString}
                </p>
            </div>
            <div class="ml-2">
                <i class="fa-solid fa-phone text-green-500 text-sm"></i>
            </div>
        </div>
    `;
    
    // Add to top of call history
    callHistoryElement.insertBefore(historyItem, callHistoryElement.firstChild);
    
    // Show message if this is the first call
    if (callHistoryElement.children.length === 1) {
        // Remove any "no calls" message if it exists
        const noCallsMessage = callHistoryElement.querySelector('.no-calls-message');
        if (noCallsMessage) {
            noCallsMessage.remove();
        }
    }
}

// Clear history button event listener
clearHistoryButton.addEventListener('click', function() {
    if (callHistoryElement.children.length === 0) {
        alert('Call history is already empty!');
        return;
    }
    
    const confirmClear = confirm('Are you sure you want to clear all call history?');
    if (confirmClear) {
        callHistoryElement.innerHTML = '';
        alert('Call history has been cleared successfully!');
    }
});

// Initialize empty call history message
function initializeCallHistory() {
    if (callHistoryElement.children.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'no-calls-message text-center text-gray-500 py-8';
        emptyMessage.innerHTML = `
            <i class="fa-regular fa-clock text-3xl mb-2 block"></i>
            <p>No calls made yet</p>
            <p class="text-sm">Your call history will appear here</p>
        `;
        callHistoryElement.appendChild(emptyMessage);
    }
}

// Initialize the call history on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCallHistory();
});