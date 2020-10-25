export function calculateFileName(files, name) {
    let [fileName, fileExt] = name.split(".", 2);

    if (!files.find(file => file.fileName === name)) return name;
    
    let i = 1;
    let newFileName = '';
    do {
        newFileName = `${fileName}(${i++}).${fileExt}`
    } while (files.find(file => file.fileName === newFileName));
    
    return newFileName;
}
