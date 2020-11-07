import opine from 'https://deno.land/x/opine@master/mod.ts'
import bison from 'https://unpkg.com/@jeffriggle/bison@1.0.10/dist/esm/index.js'

const app = opine();

app.get('/', (req, res) => {
    res.type('application/bison')
    res.setStatus(200)
    res.send(bison.encode({message: 'hello world'}))
});

app.listen(4040)