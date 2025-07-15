(function (apiKey) {
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
        y.src = 'https://cdn.pendo-atlas.pendo-dev.com/agent/static/' + apiKey + '/pendo.js';
        z = e.getElementsByTagName(n)[0];
        z.parentNode.insertBefore(y, z);
    })(window, document, 'script', 'pendo');
})('ba1443fd-2b89-4180-7ac9-9415d1893b4d');

pendo.initialize({
    visitor: {
        id: 'test_visitor'
    },
    account: {
        id: 'test-account'
    }
});

const user = {
    ID: 'u1',
    email: 'someone@example.com',
    full_name: 'Some One',
    role: 'user',
    creationDate: '12/12/24'
};
const account = { ID: 'a1', name: 'acc_name', is_paying: true, monthly_value: 1000, subscriptionCost: 0 };

pendo.identify({
    visitor: {
        id: user.ID,
        email: user.email,
        full_name: user.full_name,
        role: user.accessLevel,
        creationDate: user.creationDate
    },
    account: {
        id: account.ID,
        name: account.name,
        is_paying: account.is_paying,
        monthly_value: account.monthly_value,
        planLevel: account.subscriptionCost
    }
});

// Random Quote Generator
class QuoteGenerator {
    constructor() {
        this.quoteElement = null;
        this.authorElement = null;
        this.refreshButton = null;
        this.isLoading = false;
        this.fallbackQuotes = [
            { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
            { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
            { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
            { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
        ];
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.quoteElement = document.querySelector('.featured-quote p');
        this.authorElement = document.querySelector('.featured-quote cite');
        this.refreshButton = document.querySelector('.refresh-quote-btn');

        if (this.refreshButton) {
            this.refreshButton.addEventListener('click', () => this.fetchNewQuote());
        }

        // Load initial quote
        this.fetchNewQuote();
    }

    async fetchNewQuote() {
        if (this.isLoading) return;
        
        this.setLoading(true);
        
        try {
            const response = await fetch('https://api.quotable.io/random?minLength=50&maxLength=200');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.displayQuote(data.content, data.author);
            
        } catch (error) {
            console.log('Quote API error, using fallback:', error);
            this.displayFallbackQuote();
        } finally {
            this.setLoading(false);
        }
    }

    displayQuote(content, author) {
        if (this.quoteElement && this.authorElement) {
            // Add fade effect
            this.quoteElement.style.opacity = '0';
            this.authorElement.style.opacity = '0';
            
            setTimeout(() => {
                this.quoteElement.textContent = `"${content}"`;
                this.authorElement.textContent = `— ${author}`;
                
                this.quoteElement.style.opacity = '1';
                this.authorElement.style.opacity = '1';
            }, 200);
        }
    }

    displayFallbackQuote() {
        const randomIndex = Math.floor(Math.random() * this.fallbackQuotes.length);
        const quote = this.fallbackQuotes[randomIndex];
        this.displayQuote(quote.content, quote.author);
    }

    setLoading(loading) {
        this.isLoading = loading;
        
        if (this.refreshButton) {
            this.refreshButton.disabled = loading;
            this.refreshButton.textContent = loading ? 'Loading...' : 'New Quote';
            this.refreshButton.style.opacity = loading ? '0.6' : '1';
        }
    }
}

// Initialize quote generator
const quoteGenerator = new QuoteGenerator();
quoteGenerator.init(); 