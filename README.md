# Защищенная ссылка на видео с временной меткой

Приложение для генерации временных ссылок на стороне сервера, с целью предотвращения парсинга видео.
Внимание репозиторий весит > 100мб. (Из-за файлов .mp4) 

Для эксперимента время жизни ссылки 5 минут. (Можете поставить хоть 24 часа)

```js
async generateTimeLink(req: Request, res: Response) {
        const { dataid } = req.query;

        try {
            const imageData: IData = await ExpiredModel.findById(dataid)
            const video = imageData.video;
            const key = uuidv4();
            const date = Date.now() + 300000; //5 минут
            const data = new TimeModel({ key, date });
            const insertedData = await data.save();
            res.status(201).json({
                link: `${process.env["API"]}/assets/videos/${video}?exp=${insertedData.date}&expkey=${insertedData.key}`,
            });
        } catch (e) {
            res.status(404).json({ message: "404 error" });
        }
    }
```

Образец сгенерированной ссылки:
http://localhost:8080/api/assets/videos/kzjigit.mp4?exp=1663184645286&expkey=ac037407-2e5a-4543-b3a3-786788f4eaa4

Стэк:
React, Express, Typescript, MongoDB
