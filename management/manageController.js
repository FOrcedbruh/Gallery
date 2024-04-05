const User = require('./../models/User');
const Picture = require('./../models/Picture');
const path = require('path');



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
            const { _id, folderName, title, description} = req.body;

            console.log(_id, folderName);
            const file = req.file;

            const url = `http:localhost:8080/manage/getPictures/${file.filename}`;

            const user = await User.findById(_id);

            const folders = user.folders;

            const currentFolder = folders.filter(folder => folder.title === folderName);

            if (!currentFolder) {
                return res.json({
                    message: 'Такой папки не существует'
                })
            } else {
                 const pictures = currentFolder[0].pictures;

                 pictures.push({
                    url,
                    title,
                    description
                 });

                await user.save();

                return res.json({
                    message: `Картинка успешно доюавлена в папку ${folderName}`, file
                })
            }
        } catch(e) {
            console.log(e);
            res.json({message: 'Ошибка добавления картинки'})
        }
    }
    async getPictures(req, res) {
        const picName = req.params.picName;

        const picPath = path.join(__dirname, "../pictures", picName);

        res.sendFile(picPath);
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


    async getFolders(req, res) {
        try {
            const { _id } = req.body;

            const user = await User.findById({_id});

            const folders = user.folders;

            res.json(folders);
        } catch (e) {
            console.log(e);
            res.json({message: 'Ошибка'})
        }
    }
}

module.exports = new controller();