module formFor {

  /**
   * CheckboxField $scope.
   */
  interface CollectionLabelScope extends ng.IScope {

    /**
     * Name of collection attribute.
     */
    attribute?:string;

    /**
     * Bindable label for template to display.
     */
    bindableLabel?:string;

    /**
     * Optional help tooltip to display on hover.
     * By default this makes use of the Angular Bootstrap tooltip directive and the Font Awesome icon set.
     */
    help?:string;

    /**
     * Incoming (user-specified) label.
     * This value is passed along to 'bindableLabel' to be consumed by the associated template.
     * This field is allowed to contain markup.
     */
    label?:string;

    /**
     * Shared between formFor and CollectionLabel directives.
     */
    model?:BindableCollectionWrapper;
  }

  /**
   * Header label for collections.
   * This component displays header text as well as collection validation errors.
   *
   * @example
   * // To display a simple collection header:
   * <collection-label  label="Hobbies" attribute="hobbies">
   * </collection-label>
   *
   * @param $sce $injector-supplied $sce service
   */
  export function CollectionLabelDirective($sce:ng.ISCEService):ng.IDirective {
    return {
      require: '^formFor',
      restrict: 'EA',
      templateUrl: 'form-for/templates/collection-label.html',

      scope: {
        attribute: '@',
        help: '@?',
        label: '@'
      },

      link($scope:CollectionLabelScope, $element:ng.IAugmentedJQuery, $attributes:ng.IAttributes, formForController:FormForController):void {
        $scope.$watch('label', function(value) {
          $scope.bindableLabel = $sce.trustAsHtml(value);
        });

        $scope.model = formForController.registerCollectionLabel($scope.attribute);
      }
    };
  }

  angular.module('formFor').directive('collectionLabel', ($sce) => CollectionLabelDirective($sce));
}