module ngX {
    
    export var getTemplateUrlFromComponentName = (options: any) => {

        if (options.componentName.length > 9) {
            if (options.componentName.substr(options.componentName.length - 9) === "Component") {
                var componentTemplateFileName = options.componentName.substr(0, options.componentName.length - 9) + ".component.html";
                if (options.moduleName)
                    return "/src/" + options.moduleName + "/components/" + componentTemplateFileName;

                return "/src/" + ngX.appModuleName + "/components/" + componentTemplateFileName;
            }
        }

        
        

    }
} 