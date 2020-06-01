import opine from 'https://deno.land/x/opine@master/mod.ts'
import * as bison from 'https://unpkg.com/@jeffriggle/bison@1.0.4/dist/esm/index.js'

const app = opine();

app.get('/', (req, res) => {
    res.send(bison.encode({message: 'hello world'}))
});

app.listen(4040)