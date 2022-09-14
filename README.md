# Защищенная ссылка на видео с временной меткой

Приложение для генерации временных ссылок на стороне сервера, с целью предотвращения парсинга видео.
Внимание репозиторий весит > 100мб. (Из-за файлов .mp4) 

Для эксперимента время жизни ссылки 5 минут. (Можете поставить хоть 24 часа)

```js
async generateTimeLink(req: Request, res: Response) {
        const { id } = req.query;

        try {
            const data: IData = await ExpiredModel.findById(dataid)
            const video = data.video;
            const key = uuidv4();
            const date = Date.now() + 300000; //5 минут
            const timeStamp = new TimeModel({ key, date });
            const savedTimeData = await timeStamp.save();
            res.status(201).json({
                link: `${process.env["API"]}/assets/videos/${video}?exp=${savedTimeData.date}&expkey=${savedTimeData.key}`,
            });
        } catch (e) {
            res.status(404).json({ message: (e as Error).message });
        }
    }
```

Образец сгенерированной ссылки:
http://localhost:8080/api/assets/videos/kzjigit.mp4?exp=1663184645286&expkey=ac037407-2e5a-4543-b3a3-786788f4eaa4

Стэк:
React, Express, Typescript, MongoDB
