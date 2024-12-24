let state = {
    isClicked: false,
    hoverCount: 0,
    positionIndex: 0,
    isMoving: false,
    currentMessage: "Will you go out with me? 🥺"
};

const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const gif = document.getElementById('gif');
const questionText = document.querySelector('h1');
const messageText = document.getElementById('message-text');

const messages = {
    initial: "Yes, Yes, Yes, Yes",
    firstClick: "Really? Youre breaking my heart! 🥺",
    firstHover: "Nooo! Please, I'm begging you! 😢",
    secondHover: "PLEASEEEEEEEE 💔",
};

const buttonPositions = [
    { x: '75%', y: '20%' },
    { x: '20%', y: '70%' },
    { x: '75%', y: '70%' },
    { x: '20%', y: '20%' }
];

function moveButton() {
    if (state.isMoving) return; // Prevent multiple moves at once
    
    state.isMoving = true;
    const position = buttonPositions[state.positionIndex];
    
    noButton.style.position = 'fixed';
    noButton.style.left = position.x;
    noButton.style.top = position.y;
    noButton.style.transform = 'translate(-50%, -50%)';
    
    state.positionIndex = (state.positionIndex + 1) % buttonPositions.length;
    
    // Reset moving flag after animation completes
    setTimeout(() => {
        state.isMoving = false;
    }, 300); // Match this with your CSS transition time
}

function updateGif(hoverCount) {
    switch(hoverCount) {
        case 0:
            gif.src = "https://project-sosmed-if12hlcfo-orpheros-projects.vercel.app/assets/sad-sad-cat-aBnl32_Y.gif";
            break;
        case 1:
            gif.src = "https://project-sosmed-if12hlcfo-orpheros-projects.vercel.app/assets/sadcat-oA87Jiys.gif";
            break;
        case 2:
            gif.src = "https://project-sosmed-if12hlcfo-orpheros-projects.vercel.app/assets/cat-catcry-CrozeATC.gif";
            break;
    }
}

function updateMessage(messageKey) {
    const messageContainer = document.getElementById('message-container');
    const chatbox = messageContainer.querySelector('.chatbox');
    
    if (messageKey === 'hide') {
        messageContainer.style.opacity = '0';
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 300);
        return;
    }

    // Remove old animation
    chatbox.style.animation = 'none';
    chatbox.offsetHeight; // Trigger reflow
    
    // Add new animation
    chatbox.style.animation = 'popIn 0.5s cubic-bezier(0.26, 0.53, 0.74, 1.48)';

    messageText.style.opacity = '0';
    setTimeout(() => {
        messageText.textContent = messages[messageKey];
        messageText.style.opacity = '1';
    }, 200);
}

// Add event listener for transition end
noButton.addEventListener('transitionend', () => {
    state.isMoving = false;
});

noButton.addEventListener('click', (e) => {
    if (!state.isClicked) {
        state.isClicked = true;
        updateGif(0);
        updateMessage('firstClick');
        moveButton();
    }
    e.stopPropagation();
});

noButton.addEventListener('mouseover', (e) => {
    if (state.isClicked && !state.isMoving) {
        state.hoverCount++;
        console.log('Hover count:', state.hoverCount);

        if (state.hoverCount <= 2) {
            updateGif(state.hoverCount);
            updateMessage(state.hoverCount === 1 ? 'firstHover' : 'secondHover');
            moveButton();
        } else {
            noButton.style.display = 'none';
        }
    }
    e.stopPropagation();
});

yesButton.addEventListener('click', () => {
    gif.src = "https://media.tenor.com/_kqZQY5wX2sAAAAM/orange-cat-smile-cat-smile.gif";
    updateMessage('hide'); // Hide the chat box
    questionText.textContent = "YEAYYY!!! DONT GO ANYWHERE";
    noButton.style.display = 'none';
    
    yesButton.innerHTML = `
    <div class="overlay"></div>
    <span class="box">(づ￣ ³￣)づ CLICK ME</span>
    <div class="heart star-1"><svg height="25" width="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path class="face" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103C475.116,213.899,475.116,136.489,427.313,88.686z" fill="#fd1853"></path>
    </svg></div>
    <div class="heart star-3"><svg height="9" width="9" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path class="face" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103C475.116,213.899,475.116,136.489,427.313,88.686z" fill="#fd1853"></path>
    </svg></div>
    <div class="heart star-4"><svg height="10" width="10" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path class="face" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103C475.116,213.899,475.116,136.489,427.313,88.686z" fill="#fd1853"></path>
    </svg></div>
    <div class="heart star-5"><svg height="20" width="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path class="face" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103C475.116,213.899,475.116,136.489,427.313,88.686z" fill="#fd1853"></path>
    </svg></div>
    <div class="heart star-6"><svg height="7" width="7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path class="face" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103C475.116,213.899,475.116,136.489,427.313,88.686z" fill="#fd1853"></path>
    </svg></div>
`;
    
    yesButton.classList.add('transformed');
    yesButton.addEventListener('click', () => {
        if (yesButton.classList.contains('transformed')) {
            window.location.href = 'menu.html'; // Navigate to date picker page
        }
    });
});

// Add this to ensure the message is set initially
document.addEventListener('DOMContentLoaded', () => {
    updateMessage('initial');
});
