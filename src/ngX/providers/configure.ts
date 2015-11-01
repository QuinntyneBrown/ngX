module ngX {

    export var Configure = (options) => {
        if (options.templateMappingFn)
            ngX.getTemplateUrlFromComponentName = options.templateMappingFn;

        if (options.appModuleName)
            ngX.appModuleName = options.appModuleName;
    }
} 