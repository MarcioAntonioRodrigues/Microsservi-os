var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('../scratch');

class ActivityService {
    addActivity(activity) {
        let listaDeAtividades = localStorage.getItem("listaDeAtividades")
        let parselistaDeAtividades;
        if (listaDeAtividades != null)
            parselistaDeAtividades = JSON.parse(listaDeAtividades);
        else parselistaDeAtividades = []
        parselistaDeAtividades.push(activity)
        localStorage.setItem("listaDeAtividades", JSON.stringify(parselistaDeAtividades))
    }
}

module.exports = ActivityService;