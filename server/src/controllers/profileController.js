const User = require("../models/user-model");

class ProfileController {
  async getProfile(req, res, next) {
    try {
      const { id } = req.params;
      const oneUser = await User.findById(id);
      return res.json(oneUser);
    } catch (err) {
      next(err);
    }
  }

  async editProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { firstName,
        middleName,
        lastName,
        about,
        location,
        job,
        url,
        gitHub,
        twitter,
        instagram,
        facebook } = req.body
      if (firstName || middleName || about || location || job || url || gitHub || twitter || instagram || facebook) {
        const editUser = await User.findOneAndUpdate(id, {
          firstName,
          middleName,
          lastName,
          about,
          location,
          job,
          url,
          gitHub,
          twitter,
          instagram,
          facebook,
        }, { new: true });
        return res.json(editUser);
      }
      else {
        const editUserSkills = await User.findByIdAndUpdate(id, { skills: req.body }, { new: true });
        console.log(editUserSkills)
        return res.json(editUserSkills);
      }


    } catch (err) {
      next(err);
    }
  }

}

module.exports = new ProfileController();
