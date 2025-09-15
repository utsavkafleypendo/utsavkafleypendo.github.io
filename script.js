// Pendo configuration state
let pendoConfig = {
    apiKey: 'ba1443fd-2b89-4180-7ac9-9415d1893b4d',
    visitor: {
        id: 'test_visitor',
        email: 'someone@example.com',
        full_name: 'Some One'
    },
    account: {
        id: 'test-account',
        name: 'Test Account'
    }
};

function initializePendo(config) {
    // Remove existing Pendo script if it exists
    const existingScript = document.querySelector('script[src*="pendo.js"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Initialize new Pendo instance
    (function (p, e, n, d, o) {
        var v, w, x, y, z;
        o = p[d] = p[d] || {};
        o._q = o._q || [];
        v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track'];
        for (w = 0, x = v.length; w < x; ++w)
            (function (m) {
                o[m] =
                    o[m] ||
                    function () {
                        o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0)));
                    };
            })(v[w]);
        y = e.createElement(n);
        y.async = !0;
        y.src = 'https://cdn.pendo-atlas.pendo-dev.com/agent/static/' + config.apiKey + '/pendo.js';
        z = e.getElementsByTagName(n)[0];
        z.parentNode.insertBefore(y, z);
    })(window, document, 'script', 'pendo');

    // Initialize with visitor and account
    pendo.initialize({
        visitor: {
            id: config.visitor.id,
            email: config.visitor.email,
            full_name: config.visitor.full_name
        },
        account: {
            id: config.account.id,
            name: config.account.name
        }
    });
}

// Initialize Pendo with default config
initializePendo(pendoConfig);

// Setup form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pendo-config');
    if (!form) return;

    // Populate form with current values
    document.getElementById('apiKey').value = pendoConfig.apiKey;
    document.getElementById('visitorId').value = pendoConfig.visitor.id;
    document.getElementById('visitorEmail').value = pendoConfig.visitor.email;
    document.getElementById('visitorName').value = pendoConfig.visitor.full_name;
    document.getElementById('accountId').value = pendoConfig.account.id;
    document.getElementById('accountName').value = pendoConfig.account.name;

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Update config with form values
        pendoConfig = {
            apiKey: document.getElementById('apiKey').value,
            visitor: {
                id: document.getElementById('visitorId').value,
                email: document.getElementById('visitorEmail').value,
                full_name: document.getElementById('visitorName').value
            },
            account: {
                id: document.getElementById('accountId').value,
                name: document.getElementById('accountName').value
            }
        };

        // Reinitialize Pendo with new config
        initializePendo(pendoConfig);

        // Visual feedback
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Updated!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});