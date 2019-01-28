<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Domain\OrderEvent;

/**
 * Interface IOrderEvent
 * @package Tmtfactory\PrintingOmsBundle\Domain\OrderEvent
 */
interface IOrderEvent
{
    /**
     * @return \DateTimeInterface
     */
    public function getDate(): \DateTimeInterface;

    /**
     * @return mixed
     */
    public function getAction();

    /**
     * @return mixed
     */
    public function getPayload();
}