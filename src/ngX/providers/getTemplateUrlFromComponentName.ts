module ngX {
    
    export var getTemplateUrlFromComponentName = (options: any) => {
        var componentTemplateFileName = options.componentName.replace(/\W+/g, '.')
            .replace(/([a-z\d])([A-Z])/g, '$1.$2') + ".html";
        componentTemplateFileName = componentTemplateFileName.toLowerCase();  
        
        if(options.moduleName)      
            return "/src/" + options.moduleName + "/components/" + componentTemplateFileName;

        return "/src/" + ngX.appModuleName + "/components/" + componentTemplateFileName;
    }
} 