///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'esri/graphicsUtils',
  'dojo/aspect',
  './LayerInfo',
  './LayerInfoForDefault',
  'dojo/Deferred'
], function(declare, array, lang, graphicsUtils, aspect, LayerInfo, LayerInfoForDefault, Deferred) {
  return declare(LayerInfo, {
    /*jshint unused: false*/
    constructor: function( operLayer, map) {
      /*jshint unused: false*/
      //this.popupMenuInfo = {descriptionTitle: NlsStrings.value.itemDownload};
      var index = -1, i = 0;
      for (i = 0; i < this.popupMenuInfo.menuItems.length; i++) {
        if (this.popupMenuInfo.menuItems[i].key === 'description') {
          index = i;
          break;
        }
      }
      this.popupMenuInfo.menuItems.splice(index, 1,
          {key: 'download', label: '<a class="menu-item-description" target="_blank" href=' +
          ((this.layerObject && this.layerObject.url) ? this.layerObject.url : '') +
          '>' + this.nls.itemDownload + '</a>'});
    },

    getExtent: function() {
      var layers = this.originOperLayer.layerObject.getLayers(),
        fullExtent = null,
        layerExtent;
      array.forEach(layers, function(layer) {
        layerExtent = this._convertGeometryToMapSpatialRef(layer.initialExtent);
        if (fullExtent) {
          fullExtent = fullExtent.union(layerExtent);
        } else {
          fullExtent = layerExtent;
        }
      }, this);
      return fullExtent;
    },

    initVisible: function( /*subLayers*/ ) {
      this._visible = this.originOperLayer.layerObject.visible;
    },

    //neet to change like collectionLayer.
    _setTopLayerVisible: function(visible) {
      if (visible) {
        this.originOperLayer.layerObject.show();
      } else {
        this.originOperLayer.layerObject.hide();
      }
      this._visible = visible;
    },

    //neet to change like collectionLayer.
    /*
    setSubLayerVisible: function(subLayerId, visible) {
      array.forEach(this.newSubLayers, function(subLayerInfo) {
        //is not toplayer or not a collection.
        if (this.originOperLayer.featureCollection ||
          this.originOperLayer.layerObject.id !== subLayerInfo.layerObject.id) {
          if ((subLayerInfo.layerObject.id === subLayerId || (subLayerId === null))) {
            if (visible) {
              subLayerInfo.layerObject.show();
            } else {
              subLayerInfo.layerObject.hide();
            }
          }
        }
      }, this);
    },
    */
    
    //---------------new section-----------------------------------------
    
    obtainNewSubLayers: function() {
      var newSubLayerInfos = [];
      var layers = this.originOperLayer.layerObject.getLayers();
      array.forEach(layers, function(layerObj) {
        var subLayerInfo, deferred;
        if (this._getLayerIndexesInMapByLayerId(layerObj.id)) {
          subLayerInfo = new LayerInfoForDefault({
            layerObject: layerObj,
            title: layerObj.label || layerObj.title || layerObj.name || layerObj.id || " ",
            id: layerObj.id || " ",
            selfType: 'kml',
            url: layerObj.url,
            parentLayerInfo: this
          }, this.map);
          newSubLayerInfos.push(subLayerInfo);
          subLayerInfo.init();
        }
      }, this);
      return newSubLayerInfos;
    }
  });
});
