document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');

    async function getMembersData() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            
            const membersList = Array.isArray(data) ? data : data.members;
            displayMembers(membersList);
        } catch (error) {
            console.error('Error fetching member data:', error);
            membersContainer.innerHTML = '<p class="error">Failed to load member directory.</p>';
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('section');
            card.className = 'member-card';

            const membershipText = getMembershipLevel(member.membership);

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="80">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="tagline">${member.description || member.tagline || ''}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Membership:</strong> <span class="badge level-${member.membership}">${membershipText}</span></p>
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                </div>
            `;

            membersContainer.appendChild(card);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 1: return 'Member';
            case 2: return 'Silver';
            case 3: return 'Gold';
            default: return 'Member';
        }
    }

    
    gridBtn.addEventListener('click', () => {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });

    getMembersData();
});