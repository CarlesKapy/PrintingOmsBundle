<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Domain\OrderLine;

/**
 * Interface IOrderLine
 * @package Tmtfactory\PrintingOmsBundle\Domain\OrderLine
 */
interface IOrderLine
{
    /**
     * @return mixed
     */
    public function getId();

    /**
     * @return mixed
     */
    public function getStatus();

    /**
     * @return mixed
     */
    public function getProductData();

    /**
     * @return mixed
     */
    public function getSerigraphyData();
}