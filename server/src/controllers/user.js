import User from '../models/user';


export const changePassword = (req, res, next) => {
    const password = req.body.password;
    const email = req.user.email;
    if (!password) {
        return res.status(422).send({error: 'You must Provide Password'});
    }
    User.findOne({
        email: email
    }, (err, existingUser) => {
        if (err) {
            res.status(422).send({error: 'No user Found'});
            return next(err);
        }
        if (existingUser) {
            existingUser.password = password;
            existingUser.save((err) => {
                if (err)
                    return next(err);
                res.status(200).send("Password Changed");
            });
        }
    });
}
