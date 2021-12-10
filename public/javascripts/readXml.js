var xmlForm = document.getElementById('xmlForm');//ubicate the form
xmlForm.addEventListener('submit', upload);//add submit function
var readXml=null;//xmlContent
function upload(){
    event.preventDefault();//no reload
    var selectedFile = document.getElementById('selectedFile').files[0];//obtain the first file
    var reader = new FileReader();
    reader.onload = function(e) {//delcare the function
        let xmlContent = e.target.result;//obtain the xml content
        let parser = new DOMParser();//Can parse xml like html
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');//pass the xmlContent and the type of content
        let person = xmlDOM.querySelectorAll('person');//we get the complete object
        person.forEach(libro => {//Fill the inputs whit the xml values
            document.getElementById('titulo').value = libro.children[0].innerHTML;
            document.getElementById('autor').value = libro.children[1].innerHTML;
        });
    }
    //can read the content to getString xmlContent =>js[9:9]
    reader.readAsText(selectedFile);
}