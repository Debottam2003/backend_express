import users from '../database/usermodel.js'

export let getuser = async function (req, res) {
    try {
        let userdata = await users.find();
        res.status(200).render('index.ejs', { users: userdata });
        // res.status(200).json({ users: userdata });
        // console.log(userdata);
    } catch (error) {
        res.status(500).send({ error: "An error occurred while fetching user data." });
    }
};

export let setuser = async function (req, res) {
    console.log(req.body);
    try {
        let { username, age, shopping } = req.body;
        // Optional: Handle missing fields
        if (!username || !age || !shopping) {
            return res.status(400).send({ error: "All fields are required." });
        }
        await users.create({
            username,
            age,
            shopping: Number(shopping),
        });
        // res.status(200).send("New User Data added successfully.");
        res.redirect('/api/getuser'); // Redirect to the getuser route to display updated data
        return;
    } catch (error) {
        return res.status(500).send({ error: "An error occurred while adding user data." });
    }
};