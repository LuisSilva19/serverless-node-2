const { converteDadosCsv } = require("../converteDadosCsv");
const { obtemDadosDoCsvDoBucket } = require("../local/servidorS3");

module.exports.cadastrarAlunos = async (evento) => {
    try {
      const eventoS3 = evento.Records[0].s3;
  
      const nomeBucket = eventoS3.bucket.name;
      const chaveBucket = decodeURIComponent(eventoS3.object.key.replace(/\+/g, " "));
  
      const dadosArquivo = await obtemDadosDoCsvDoBucket(nomeBucket, chaveBucket);
  
      const alunos = await converteDadosCsv(dadosArquivo);
  
      await cadastrarAlunosNoBd(alunos);
    } catch (erro) {
      console.log(erro);
    }
};