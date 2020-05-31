import opine from 'https://deno.land/x/opine@master/mod.ts'

const app = opine();

app.get('/', (req, res) => {
    res.send('Sup')
});

app.listen(4040)