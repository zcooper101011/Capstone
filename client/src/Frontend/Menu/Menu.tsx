import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import FrontPage from "../FrontPage/FrontPage";
import "./menu.css";

const description = "We aim to provide you with quality, delicious food for parties, weddings, special events, etc. We provide you with choices of appetizers, different meat entrees, and so much more!";


function Menu() {
    return (
        <div id="menu">
            <FrontPage title="Menu" description={description} />
            <div>
                <div className="menuType">
                    Brunch
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                BREAKFAST CHARCUTERIE
                            </div>
                            <div className="menuItemDescription">
                                Includes mini croissants, gluten free lemon blueberry thyme
                                scones and a fruit platter consisting of grapes, pears, oranges, kiwi, and assorted berries
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                MINI QUICHES
                            </div>
                            <div className="menuItemDescription text-end">
                                Spinach, artichoke, red pepper and goat cheese - gluten free
                                option available (no crust)
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                BREAKFAST CHARCUTERIE
                            </div>
                            <div className="menuItemDescription">
                                Includes mini croissants, gluten free lemon blueberry thyme
                                scones and a fruit platter consisting of grapes, pears, oranges, kiwi, and assorted berries
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                MINI QUICHES
                            </div>
                            <div className="menuItemDescription text-end">
                                Spinach, artichoke, red pepper and goat cheese - gluten free
                                option available (no crust)
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                EGG GALETTES TWO WAYS
                            </div>
                            <div className="menuItemDescription">
                                Mushroom, red onion, gruyere, thyme and parsley egg galette
                                Pear, prosciutto, gorgonzola egg galette
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                TWISTED BACON
                            </div>
                            <div className="menuItemDescription text-end">
                                Gluten free - bacon baked with a brown sugar glaze
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                HASHBROWN PARMESAN MUFFIN BAKES
                            </div>
                            <div className="menuItemDescription">
                                Gluten free - crispy hashbrowns in a muffin size bite
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                MINI TOASTS TWO WAY
                            </div>
                            <div className="menuItemDescription text-end">
                                Avocado caprese - avocado spread with tomato, mozzarella,
                                basil drizzled with EVOO and balsamic glaze
                                Smoked salmon, cream cheese, cucumber, pickled red onions,
                                dill, and capers
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                WATERMELON & FETA SALAD
                            </div>
                            <div>
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                DARK CHOCOLATE COVERED
                                STRAWBERRIES
                            </div>
                            <br></br>
                            <div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                CREME BRULE WITH FRESH BERRIES
                            </div>
                            <div>
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                DARK CHOCOLATE RASPBERRY CAKE BITES
                            </div>
                            <div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                GRAPEFRUIT AVOCADO SALAD
                            </div>
                            <div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Appetizers
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                CAPRESE/ANTIPASTO SKEWERS
                            </div>
                            <div className="menuItemDescription">
                                Fresh tomatoes, mozzarella and basil, tortellini, salami and
                                kalamata olives drizzled with EVOO, balsamic glaze and
                                salt & pepper
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                ARANCINI
                            </div>
                            <div className="menuItemDescription text-end">
                                Italian rice balls stuffed with mozzarella & prosciutto served
                                with a marinara sauce
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                STEAK CROSTINI
                            </div>
                            <div className="menuItemDescription">
                                Tender sliced London broil served atop a garlic crostini with
                                a homemade horseradish cream sauce & chives
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                SOUTHERN STYLE SHRIMP & GRITS
                            </div>
                            <div className="menuItemDescription text-end">
                                Cheesy grits served with a jumbo shrimp
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                ASPARAGUS WRAPPED IN PROSCIUTTO
                            </div>
                            <div className="menuItemDescription">
                                Served with a tarragon sauce
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                TUSCAN STUFFED MUSHROOMS
                            </div>
                            <div className="menuItemDescription text-end">
                                Stuffed with spinach, sun-dried tomatoes and a blend
                                of cheeses
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                SWEET & SPICY COCKTAIL MEATBALLS
                            </div>
                            <div className="menuItemDescription">
                                Bite sized meatballs with a sweet and savory flavor with a
                                spicy kick
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                MINI CRAB CAKES
                            </div>
                            <div className="menuItemDescription text-end">
                                Served with a remoulade sauce
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                BOURSIN CHEESE WITH CARAMELIZED
                                ONIONS & BACON
                            </div>
                            <div className="menuItemDescription">
                                Served with assorted crackers
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                CHARCUTERIE
                            </div>
                            <div className="menuItemDescription text-end">
                                Assorted cheeses, meats, fruit, veggies, nuts, jams, spreads
                                and a variety of crackers
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Chicken Entrees
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                CHICKEN PARMESAN
                            </div>
                            <div className="menuItemDescription">
                                Lightly breaded fried or baked chicken breast served on a
                                bed of pasta topped with a homemade San Marzano
                                tomato sauce and mozzarella cheese
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                CREAMY CHICKEN PICCATA
                                CHICKENMARSALA
                            </div>
                            <div className="menuItemDescription text-end">
                                Perfectly seared chicken breasts served with garlicky
                                mashed red potatoes
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                FLORENTINE BUTTER CHICKEN
                            </div>
                            <div className="menuItemDescription">
                                Served with burst cherry tomatoes served with a garlic
                                cauliflower mash
                            </div>
                        </Col>
                        <Col>
                            <div>
                            </div>
                            <div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Beef Entrees
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                BALSAMIC FLANK STEAK
                            </div>
                            <div className="menuItemDescription">
                                Served with a choice of potato and vegetable
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                CAST IRON STEAK WITH A WHISKEY
                                GARLIC CREAM SAUCE
                            </div>
                            <div className="menuItemDescription text-end">
                                Served with oven roasted baby potatoes and roasted
                                asparagusPasta
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                GARLIC HERB BUTTER TENDERLOIN
                            </div>
                            <div className="menuItemDescription">
                                Served with garlic herb mashed potatoes and roasted
                                asparagus or Brussel sprouts
                            </div>
                        </Col>
                        <Col>
                            <div>
                            </div>
                            <div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Seafood Entrees
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                MUSSELS OR CLAMS
                            </div>
                            <div className="menuItemDescription">
                                Served with a homemade marinara sauce, garlic wine sauce
                                or vodka sauce served over fettuccini or linguine pasta
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                PAN SEARED SEA SCALLOPS
                            </div>
                            <div className="menuItemDescription text-end">
                                Served with jalapeno bourbon cream sauce served over
                                a mushroom risotto
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                BROWN BUTTER SCALLOPS
                            </div>
                            <div className="menuItemDescription">
                                Served over a parmesan risotto or a burst cherry tomatoes,
                                basil and pasta
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem">
                                TRADITIONAL SHRIMP SCAMPI
                            </div>
                            <div className="menuItemDescription">
                                Served over angel hair pasta
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Pasta Entrees
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                SAN MARZANO TOMATO SAUCE OR
                                A AUTHENTIC ALFREDO SAUCE
                            </div>
                            <div className="menuItemDescription">
                                Served over pasta with a choice of blackened chicken
                                or shrimp
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                ROASTED CHERRY TOMATO
                                CARBONARO PASTA
                            </div>
                            <div className="menuItemDescription text-end">
                                Served with crispy prosciutto and burrata cheese
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                PASTA ALLA VODKA
                            </div>
                            <div className="menuItemDescription">
                                Served over rigatoni pasta
                            </div>
                        </Col>
                        <Col>
                            <div>
                            </div>
                            <div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Desserts
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                CREME BRULE
                            </div>
                            <div className="menuItemDescription">
                                Made from scratch, served with fresh berries
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                DESSERT JARS
                            </div>
                            <div className="menuItemDescription text-end">
                                Oreo cheesecake, banana caramel cream, key lime
                                pie cheesecake
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                TIRAMISU CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers of vanilla cake soaked with coffee and coffee
                                liqueur filled with a mascarpone custard and creamy swiss
                                meringue buttercream icing
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem">
                                PEACH RICOTTA LAYER CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers filled with fresh peaches with a brown
                                butter buttercream icing
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                BLACKBERRY LAVENDAR NAKED CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers filled with blackberry jam with white
                                chocolate buttercream
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem">
                                LEMON TART
                            </div>
                            <div className="menuItemDescription">
                                Topped with fresh berries
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                SALTED CARAMEL APPLE CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers of apple spice cake with a salted caramel and
                                buttercream icing drizzled with homemade caramel
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem">
                                STRAWBERRIES & CREAM CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers of white cake filled with fresh strawberries with
                                a whipped cream icing
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                FESTIVE BOURBON APPLE CIVER
                                NAKED CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers of an apple cider spiced cake, with a bourbon
                                buttercream icing
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem">
                                CANNOLI CAKE
                            </div>
                            <div className="menuItemDescription">
                                Three layers filled with cannoli filling with a buttercream icing
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="menuType">
                    Themed Dinner Options
                </div>
                <Container >
                    <Row>
                        <Col>
                            <div className="menuItem">
                                TACO BAR
                            </div>
                            <div className="menuItemDescription">
                                A festive and colorful dining experience that provides all of
                                the fixings for a crowd that loves tacos. Finish the meal off
                                with a delicious tres leches cake
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem text-end">
                                PASTA BAR
                            </div>
                            <div className="menuItemDescription text-end">
                                Start off with a caprese salad, then a variety of pasta &
                                sauces served with choices of chicken, meatballs,
                                sausage, fresh salad, garlic bread, and a desert
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="menuItem">
                                GRANDMA A'S LASAGNA DINNER
                            </div>
                            <div className="menuItemDescription">
                                My Grandmothers traditional family meal of layers of pasta,
                                cheese and meat sauce baked to perfection. Served with a
                                choice of caprese salad or arancini, fresh mixed green and
                                crusty garlic bread. Choice of desert
                            </div>
                        </Col>
                        <Col>
                            <div className="menuItem">
                                LOW COUNTRY BOIL
                            </div>
                            <div className="menuItemDescription">
                                A coastal staple, fresh local shrimp, smoked sausage,
                                baby red potatoes and corn on the cob served with a
                                buttermilk cornmeal biscuit, homemade cocktail sauce,
                                butter and a variety of hot sauces
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default Menu;
