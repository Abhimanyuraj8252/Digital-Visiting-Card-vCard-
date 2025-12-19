// Theme Toggle Logic
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun', 'text-yellow-400');
        themeIcon.classList.add('fa-moon', 'text-slate-700');
    } else {
        themeIcon.classList.remove('fa-moon', 'text-slate-700');
        themeIcon.classList.add('fa-sun', 'text-yellow-400');
    }
}

// Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Save Contact (vCard Generator)
function saveContact() {
    // Contact Details
    const contact = {
        name: "Alex Chen",
        phone: "+1234567890",
        email: "alex@example.com",
        title: "Senior Full-Stack Developer",
        org: "Tech Solutions Inc.",
        url: window.location.href
    };

    // VCF Format construction
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.org}
TITLE:${contact.title}
TEL;TYPE=WORK,VOICE:${contact.phone}
EMAIL;TYPE=WORK:${contact.email}
URL:${contact.url}
END:VCARD`;

    // Create Blob
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    
    // Create Link and Click
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact.vcf";
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Share Profile
async function shareProfile() {
    const shareData = {
        title: 'Alex Chen - Digital Card',
        text: 'Check out my digital visiting card!',
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('Shared successfully');
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'))
            .catch(() => alert('Failed to copy link.'));
    }
}
