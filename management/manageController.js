const User = require('./../models/User');
const Picture = require('./../models/Picture');



class controller {
    async addFolder(req, res) {
        try {
            const { title, description, _id } = req.body;

            const folder = {
                title,
                description
            }

            const user = await User.findById(_id);

            const badTitle = user.folders.find(folder => folder.title === title);

            if (badTitle) {
                return res.json({message: `Папка ${title} уже существует`});
            }

            user.folders.push(folder);

            user.save();

            return res.json({message: `Папка ${title} создана`});

        } catch(e) {
            console.log(e);
            return res.json({message: 'Ошибка создания папки'});
        }
    }

    async addPicture(req, res) {
        try{
            const { title, url, _id, description, folderTitle } = req.body;

            const picture = {
                title,
                url,
                description
            }

            const user = await User.findById(_id);

            const folder = user.folders.find(folder => folder.title === folderTitle);

            folder.pictures.push(picture);
        
            await user.save();

            return res.json({message: 'Картинка успешно добавлена'});

        } catch(e) {
            console.log(e);
            res.json({message: 'Ошибка добавления картинки'})
        }
    }

    async postPicture(req, res)  {
        try {

            const { title, url, description, username } = req.body;

            const DateStr = new Date();

            const currentDate = DateStr.toLocaleDateString();

            const picture = new Picture({
                title,
                url,
                description,
                date: currentDate,
                user: username
            });

            await picture.save();

            return res.json({message: "Картинка выложена"});

        } catch(e) {
            console.log(e);
            return res.json({message: 'Ошибка'})
        }
    }

    async getPictures(req, res) {
        
        const pictures = await Picture.find();

        res.json(pictures);
    }
}

module.exports = new controller();