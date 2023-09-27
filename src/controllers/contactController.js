const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contact', { contact: {} });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact'));
            return
        }
        req.flash('success', 'Contact registered successfully');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contact = await Contact.searchForId(req.params.id)
    if (!contact) return res.render('404');
    res.render('contact', { contact })
}

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`/contact/${req.params.id}`));
            return
        }
        req.flash('success', 'Contact edited successfully');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return
    } catch (error) {
        console.log(error);
        return res.render('404')
    }
}
