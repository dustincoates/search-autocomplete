'use strict';

$(document).ready(function() {
  var client = algoliasearch('E0MO40WDEK', '93eb5b1c6e5af89101617d83d6c619ca');
  var products = client.initIndex('bestBuyProducts');

  var source = $('#product-template').html();
  var productTemplate = Handlebars.compile(source);

  var typeaheadOptions = {hint: false};
  var typeAheadSchema = [{
        source: products.ttAdapter({hitsPerPage: 10}),
        displayKey: 'name',
        hint: 'false',
        templates: {
          header: '<div class="category">Products</div>',
          suggestion: function(result) {
            return productTemplate(result);
          }
        }
      }];

  $('#product-search').typeahead(typeaheadOptions, typeAheadSchema)
    .on('typeahead:selected', function(event, data, dataset) {
      event.preventDefault();
      window.location.href = data.url;
    });
});
