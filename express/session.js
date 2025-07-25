import express from 'express';
import session from 'express-session';

const app = express();

const sessionMiddleware = session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 }
});

app.use(sessionMiddleware);

const PORT = 3333;

app.get('/', (req, res) => {
    console.log(req.sessionID);
    req.session.user = { name: 'John Doe' };
    console.log(req.session);
    // req.sessionStore.get(req.sessionID, (err, sessionData) => {
    //     if (err) {
    //         console.error('Error retrieving sessions:', err);
    //     }
    //     else {
    //         console.log('Session Data:', sessionData);
    //     }
    // });
    res.json('Hello, Express!');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        // Clear the cookie on client
        res.clearCookie('connect.sid');

        res.json({ message: 'Logged out successfully' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Work flow

// Creatiron part (First time request came to the server):
// configure session middlewere
// one session object is created against a session id
// this session object is mapped to a session id and stored in memory
// and this session object and id is added to the session store as well as the
// request object and the if uninitialized is set to true then without adding any data
// to the session object it will be stored in the session and send over to the client as cookie
// (ex. connect.sid = "abc123")
// but if the isuninitialized is set to false then the session object will not be stored in the session store
// and the session id will not be sent to the client as cookie we have to add some data to the session object.

// Checking part (Next time request came to the server):
// the session id which is stored as cookie in the client is sent to the server with the request
// and the session will middleware do the job, the session id will be checked if that is expired
// and also is there is session object against that session id is present in the session store
// and the session object is retrived will be added to the request object as
// req.session = SessionObjectRetrivedFromSessionStore
// else a new session object will be created and added to the request object
// and a new session id also created and depending on the isUninitialized value
// the session object will be stored in the session store and sent to the client as cookie
// or may be not sent to the client as cookie and not stored in the session store

// Creation Part (First Request):
// - session middleware is configured
// - session ID is generated, empty session object is created
// - session object is mapped to the session ID
// - if saveUninitialized is true:
//     - session is stored and cookie is sent to client
// - if saveUninitialized is false:
//     - session is not stored or sent unless modified
// - the generated session ID is assigned to req.sessionID

// Checking Part (Next Request):
// - client sends back session ID via cookie (connect.sid)
// - session middleware checks:
//     - is session ID valid?
//     - is session expired?
// - if valid:
//     - session is restored: req.session = sessionObject
//     - the same session ID is assigned back to req.sessionID
// - if invalid or expired:
//     - a new session object is created
//     - a new session ID is generated
//     - the new session ID is assigned to req.sessionID
//     - same rules for saving based on saveUninitialized
