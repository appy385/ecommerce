/* eslint-disable no-useless-catch */
const { fetchCategoryData, fetchItemData } = require('../utils/fetch.util');
const {
  Category, Item, Feature, Value, FeatureValue, ItemFeature, CategoryItem,
} = require('../models/index');

const createEcom = async (categoryArray) => {
  try {
    // insert categories
    const categoriesData = await Promise.all(categoryArray.map((category) => fetchCategoryData(category)));
    const categoriesDbResult = await Promise.all(categoriesData.map(async (categoryData) => {
      const foundItem = await Category.findOne({ where: { name: categoryData.name } });

      const categoryObject = { name: categoryData.name, description: categoryData.description };

      if (!foundItem) {
        // create
        const newItem = await Category.create(categoryObject);
        console.log(`category created: ${newItem.dataValues} `);
        return newItem;
      }
      // update
      const updatedItem = await Category.update(categoryObject, { where: { id: foundItem.id }, returning: true });
      // console.log(`category updated from : ${foundItem.dataValues} `);
      // console.log(`category updated to : ${updatedItem} `);
      return updatedItem;
    }));
    // insert item
    await Promise.all(categoriesData.map(async (categoryData) => {
      await Promise.all(categoryData.itemMetadata.map(async (item) => {
        const foundItem = await Item.findOne({ where: { item_id: item.id } });

        const itemObject = { item_id: item.id, name: item.name, description: item.description };

        if (!foundItem) {
        // create
          const newItem = await Item.create(itemObject);
          console.log(`category created: ${newItem.dataValues} `);
          return;
        }
        // update
        const updatedItem = await Item.update(itemObject, { where: { id: foundItem.id }, returning: true });
        // console.log(`category updated from : ${foundItem.dataValues} `);
        // console.log(`category updated to : ${updatedItem} `);
        item.feature;
      }));
    }));
    // load feature and values
    const itemsArray = await Item.findAll();
    const newItemArray = [];
    await Promise.all(await itemsArray.map(async (item) => {
      const array = await fetchItemData(item.item_id);
      newItemArray.push({ id: item.item_id, features: array.features });
      await Promise.all(array.features.map(async (feature) => {
        const foundFeature = await Feature.findOne({ where: { name: feature.name } });

        const featureObject = { name: feature.name };
        let featureFinal;
        if (!foundFeature) {
        // create
          const newFeature = await Feature.create(featureObject);
          console.log(`category created: ${newFeature.dataValues} `);
          featureFinal = newFeature.dataValues;
        } else {
          // update
          const updatedFeature = await Feature.update(featureObject, { where: { id: foundFeature.id }, returning: true });
          // console.log(`category updated from : ${foundFeature.dataValues} `);
          // console.log(`category updated to : ${updatedFeature} `);
          featureFinal = foundFeature;
        }

        const foundValue = await Value.findOne({ where: { name: feature.value.toString() } });
        const valueObject = { name: feature.value.toString() };
        let value;
        if (!foundValue) {
          // create
          const newValue = await Value.create(valueObject);
          console.log(`category created: ${newValue.dataValues} `);
          value = newValue.dataValues;
        } else {
          const updatedValue = await Value.update(valueObject, { where: { id: foundValue.id }, returning: true });
          // console.log(`category updated from : ${foundValue.dataValues} `);
          // console.log(`category updated to : ${updatedValue}`);
          value = foundValue;
        }
        // console.log(featureFinal);

        const foundFeatureValue = await FeatureValue.findOne({ where: { feature_pid: featureFinal.id, value_pid: value.id } });
        const featureValueObject = { feature_pid: featureFinal.id, value_pid: value.id };

        if (!foundFeatureValue) {
          // create
          const newFeatureValue = await FeatureValue.create(featureValueObject);
          console.log(`category created: ${newFeatureValue.dataValues} `);
          return;
        }
        const updatedFeatureValue = await FeatureValue.update(featureValueObject, { where: { id: foundFeatureValue.id }, returning: true });
        // console.log(`category updated from : ${foundFeatureValue.dataValues} `);
        // console.log(`category updated to : ${updatedFeatureValue}`);
      }));
    }));

    // load item feature mapping
    // console.log(newItemArray);
    await Promise.all(await newItemArray.map(async (item) => {
      // console.log(item);
      const foundItem = await Item.findOne({ where: { item_id: item.id } });
      await Promise.all(await item.features.map(async (feature) => {
        console.log(feature);
        const foundFeature = await Feature.findOne({ where: { name: feature.name } });
        const foundItemFeature = await ItemFeature.findOne({ where: { item_pid: foundItem.id, feature_pid: foundFeature.id } });
        const itemFeatureObject = { item_pid: foundItem.id, feature_pid: foundFeature.id };
        if (!foundItemFeature) {
          // create
          const newItemFeature = await ItemFeature.create(itemFeatureObject);
          console.log(`category created: ${newItemFeature.dataValues} `);
          return;
        }
        const updatedItemFeature = await ItemFeature.update(itemFeatureObject, { where: { id: foundItemFeature.id }, returning: true });
        // console.log(`category updated from : ${foundFeatureValue.dataValues} `);
        // console.log(`category updated to : ${updatedFeatureValue}`);
      }));
    }));
    // console.log(categoriesData);
    // load category feature mapping
    await Promise.all(await categoriesData.map(async (categoryData) => {
      const foundCategory = await Category.findOne({ where: { name: categoryData.name } });
      await Promise.all(categoryData.itemMetadata.map(async (item) => {
        const foundItem = await Item.findOne({ where: { item_id: item.id } });
        const foundCategoryItem = await CategoryItem.findOne({ where: { item_pid: foundItem.id, category_pid: foundCategory.id } });
        const categoryItemObject = { item_pid: foundItem.id, category_pid: foundCategory.id };
        if (!foundCategoryItem) {
          // create
          const newCategoryItem = await CategoryItem.create(categoryItemObject);
          console.log(`category created: ${newCategoryItem.dataValues} `);
          return;
        }
        const updatedCategoryItem = await CategoryItem.update(categoryItemObject, { where: { id: foundCategoryItem.id }, returning: true });
      }));
    }));

    return 'Success';
  } catch (error) {
    throw error;
  }
};

module.exports = { createEcom };
