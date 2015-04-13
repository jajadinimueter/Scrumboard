// Jasmine test for the HTML scaffold

"use strict";

describe("Scrumboard", function() {             

  describe("columns", function() {

    describe("Todo", function() {
      it("should have a column 'Todo'", function() {
        //expect($("#todo").length).toBe(1);
        expect($("#todo").length).toEqual(1);
        //expect($("#todo").html()).toEqual("Todo");
        //expect($("#todo")).toEqual('<th id="todo">Todo</th>');
      });
    });
  });

});
